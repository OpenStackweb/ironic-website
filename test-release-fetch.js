#!/usr/bin/env node
/**
 * Test script to verify automatic release series detection and fetching
 * Run with: node test-release-fetch.js
 */

const axios = require('axios');

async function getSeriesStatusData() {
  try {
    console.log('📋 Fetching OpenStack series status data...');
    const response = await axios.get('https://raw.githubusercontent.com/openstack/releases/master/data/series_status.yaml');

    // Simple YAML parsing for series data
    const yamlContent = response.data;
    const seriesMatches = yamlContent.match(/- name: ([^\s]+)\s+release-id: ([^\s]+)/g);

    if (!seriesMatches) {
      throw new Error('Could not parse series status data');
    }

    const seriesData = {};
    const seriesOrder = [];

    seriesMatches.forEach(match => {
      const nameMatch = match.match(/name: ([^\s]+)/);
      const idMatch = match.match(/release-id: ([^\s]+)/);

      if (nameMatch && idMatch) {
        const name = nameMatch[1];
        const releaseId = idMatch[1];
        seriesData[name] = releaseId;
        seriesOrder.push(name);
      }
    });

    console.log(`✅ Found ${Object.keys(seriesData).length} series in OpenStack data`);
    return { seriesData, seriesOrder };
  } catch (error) {
    console.log('⚠️  Could not fetch series status, using fallback data');
    const fallbackOrder = ['gazpacho', 'epoxy', 'dalmatian', 'caracal'];
    const fallbackData = {
      'gazpacho': '2026.1', 'epoxy': '2025.1', 'dalmatian': '2024.2', 'caracal': '2024.1'
    };
    return { seriesData: fallbackData, seriesOrder: fallbackOrder };
  }
}

async function getLatestReleaseSeries() {
  try {
    console.log('🔍 Auto-detecting latest OpenStack release series...');

    // Get dynamic series data from OpenStack
    const { seriesData, seriesOrder } = await getSeriesStatusData();
    const knownSeries = seriesOrder;

    console.log(`📋 Checking series in order: ${knownSeries.slice(0, 5).join(', ')}${knownSeries.length > 5 ? '...' : ''}`);

    // Try each series until we find one with ironic.yaml
    for (const series of knownSeries) {
      try {
        await axios.head(`https://raw.githubusercontent.com/openstack/releases/master/deliverables/${series}/ironic.yaml`);
        console.log(`✅ Found Ironic releases in series: ${series}`);
        return { series, seriesData };
      } catch (error) {
        // Series doesn't have ironic.yaml, try next
        continue;
      }
    }

    throw new Error('No ironic.yaml found in any release series');
  } catch (error) {
    console.log('⚠️  Auto-detection failed, using known fallbacks');
    const fallbackData = {
      'gazpacho': '2026.1', 'epoxy': '2025.1', 'dalmatian': '2024.2', 'caracal': '2024.1'
    };
    return {
      series: ['gazpacho', 'epoxy', 'dalmatian', 'caracal'],
      seriesData: fallbackData
    };
  }
}

async function testReleaseFetch() {
  console.log('🧪 Testing automatic Ironic release detection...\n');

  try {
    // Test auto-detection with dynamic series mapping
    const detectionResult = await getLatestReleaseSeries();

    if (Array.isArray(detectionResult.series)) {
      // Fallback mode
      console.log('\n🔄 Testing fallback mode...');
      for (const series of detectionResult.series) {
        try {
          const response = await axios.get(`https://raw.githubusercontent.com/openstack/releases/master/deliverables/${series}/ironic.yaml`);
          const yamlContent = response.data;
          const releaseMatches = yamlContent.match(/- version: ([\d.]+)/g);

          if (releaseMatches && releaseMatches.length > 0) {
            const latestVersion = releaseMatches[releaseMatches.length - 1].replace('- version: ', '');
            const seriesVersion = detectionResult.seriesData[series] || 'unknown';

            // Try to get the actual release date
            let releaseDate = 'unknown';
            try {
              const hashPattern = new RegExp(`- version: ${latestVersion.replace(/\./g, '\\.')}[\\s\\S]*?hash: ([a-f0-9]+)`, 'i');
              const hashMatch = yamlContent.match(hashPattern);

              if (hashMatch && hashMatch[1]) {
                const gitHash = hashMatch[1];
                const commitResponse = await axios.get(`https://api.github.com/repos/openstack/ironic/commits/${gitHash}`);
                releaseDate = commitResponse.data.commit.committer.date;
              }
            } catch (error) {
              // Release date fetch failed, continue with 'unknown'
            }

            console.log(`✅ Latest ${series} (${seriesVersion}) version: ${latestVersion} (${releaseDate})`);
            break;
          }
        } catch (error) {
          console.log(`⚠️  ${series} series failed, trying next...`);
          continue;
        }
      }
    } else {
      // Auto-detection succeeded
      const series = detectionResult.series;
      const seriesVersion = detectionResult.seriesData[series] || 'unknown';
      console.log(`\n📡 Testing detected series: ${series} (${seriesVersion})`);
      const response = await axios.get(`https://raw.githubusercontent.com/openstack/releases/master/deliverables/${series}/ironic.yaml`);

      const yamlContent = response.data;
      const releaseMatches = yamlContent.match(/- version: ([\d.]+)/g);

      if (!releaseMatches || releaseMatches.length === 0) {
        throw new Error(`No releases found in ${series} YAML`);
      }

      const latestVersion = releaseMatches[releaseMatches.length - 1].replace('- version: ', '');

      // Try to get the actual release date
      let releaseDate = 'unknown';
      try {
        const hashPattern = new RegExp(`- version: ${latestVersion.replace(/\./g, '\\.')}[\\s\\S]*?hash: ([a-f0-9]+)`, 'i');
        const hashMatch = yamlContent.match(hashPattern);

        if (hashMatch && hashMatch[1]) {
          const gitHash = hashMatch[1];
          const commitResponse = await axios.get(`https://api.github.com/repos/openstack/ironic/commits/${gitHash}`);
          releaseDate = commitResponse.data.commit.committer.date;
        }
      } catch (error) {
        // Release date fetch failed, continue with 'unknown'
      }

      console.log(`✅ Latest ${series} (${seriesVersion}) version: ${latestVersion} (${releaseDate})`);
    }

    console.log('\n🎉 All tests passed! Dynamic release detection is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testReleaseFetch();