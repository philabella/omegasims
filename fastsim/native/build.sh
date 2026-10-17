#!/bin/sh
# Builds libmpow.node (libm's pow for the vm engine). Needs gcc and Node's headers (shipped with Node in include/node).
set -e
cd "$(dirname "$0")"
NODE_INC="$(dirname "$(dirname "$(readlink -f "$(command -v node)")")")/include/node"
gcc -O2 -shared -fPIC -DNODE_GYP_MODULE_NAME=libmpow -I"$NODE_INC" libmpow.c -o libmpow.node -lm
echo "built $(pwd)/libmpow.node"
