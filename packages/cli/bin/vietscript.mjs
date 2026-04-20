#!/usr/bin/env node
import process from 'node:process'
import { main } from '../dist/index.js'

await main(process.argv)
