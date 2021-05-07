#!/bin/bash
fuser -k 3000/tcp
npm start & npm run css-start