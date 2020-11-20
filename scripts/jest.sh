#!/bin/bash

set -ex

NODE_ENV=test

function runJest() {
  node \
    --expose-gc \
    --max_old_space_size=4096 \
    ./node_modules/.bin/jest \
      --logHeapUsage \
      --maxWorkers 3 \
      --config "${1}"
}

if [ "$1" == "v1" ]; then
  runJest jest.config.v1.js
elif [ "$1" == "v2" ]; then
  runJest jest.config.v2.js
fi
