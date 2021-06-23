---
title: "Docker Caching to Improve Build Times"
slug: "docker-caching-to-improve-build-times"
date: 2021-05-19
author: "Michael Baird"
description: "We will discuss various ways of speeding up the build time of Docker images in a continuous integration pipeline."
image: "./containers.jpg"
category: Docker
tags:
- docker
- npm
- devops
---

Building software in a CI/CD pipeline can be slow, especially when you are building node/npm applications like [React apps](https://github.com/facebook/create-react-app). Downloading and installing npm packages, system dependencies and optimizing production builds—it all adds up.

> You can find the full source code for this project in the [demo-docker-layer-caching](https://github.com/MikeBairdRocks/demo-docker-layer-caching) repo on GitHub.

# Docker Caching

The image cache is incredibly helpful and can save you a lot of time while building your images. Docker creates a snapshot from the result of every instruction during a build. Note: [Buildkit](https://docs.docker.com/develop/develop-images/build_enhancements/) needs to be enabled to take advantage of this feature.

These snapshots are called layers, and each layer is a recording of what changed as a result of executing an instruction.
A layer only stores what changed since running the previous instruction and each layer is dependent on the previous layer.
Every `RUN`, `COPY`, or `ADD` instruction in your Dockerfile creates a read-only layer and then adds a small writable container layer on top, once you want to run your image.
Files from different layers are combined to form a filesystem for your container.
This allows for re-use in subsequent builds, or even shared between different final containers. So, you can significantly speed up builds with Docker cache.

