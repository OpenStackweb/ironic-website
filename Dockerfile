FROM debian:11

ENV DEBIAN_FRONTEND noninteractive
RUN apt update && apt install -y yarnpkg npm

COPY . /website
WORKDIR /website

RUN yarnpkg
RUN yarnpkg build

ENTRYPOINT ["yarnpkg", "develop"]
