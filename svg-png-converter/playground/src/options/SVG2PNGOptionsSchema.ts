import { JSONSchema6 } from 'json-schema'
import { base64ToUrl } from '../../../dist/src'
import { graph1_svg } from '../examples/files/graph1_svg'

export const SVG2PNGOptionsSchema: JSONSchema6 = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "properties": {
    "input": {
      "type": 'string',
      "anyOf": [
        {
          "type": "string",
          "format": "data-url",
          "title": "Single file",
        } as any,
        {
          "type": "string",
          "title": "SVG Code",
        }
      ],
      "description": "SVG code to render as plain text.\n\nFor CLi or Node.js, it can also be path or glob file pattern to .svg files, relative to current dir.",
      default: base64ToUrl(graph1_svg, 'image/svg+xml')
    },
    "encoding": {
      "description": "Output image encoding. One of: `base64, dataURL, raw, buffer`. By default: `raw`.",
      "enum": [
        "base64",
        "dataURL",
        "raw",
        "buffer"
      ],
      "type": "string",
      "default": "dataURL"
    },
    "format": {
      "description": "Output format. One of: `png, jpeg`. By default: `png`.",
      "enum": [
        "jpeg",
        "png"
      ],
      "type": "string",
      "default": "png"
    },

    "width": {
      "description": "Cropping width. Introduced in v1.2.14",
      "type": "number"
    },
    "height": {
      "description": "Cropping height. Introduced in v1.2.14",
      "type": "number"
    },
    "multiplier": {
      "description": "Multiplier to scale by",
      "type": "number",
      "default": 1
    },
    "quality": {
      "description": "Quality level (0..1). Only used for jpeg",
      "type": "number",
      "default": 1
    },
    "left": {
      "description": "Cropping left offset. Introduced in v1.2.14",
      "type": "number",
      "default": 0
    },
    "top": {
      "description": "Cropping top offset. Introduced in v1.2.14",
      "type": "number",
      "default": 0
    },
    "withoutShadow": {
      "type": "boolean",
      "default": false
    },
    "withoutTransform": {
      "type": "boolean",
      "default": false
    },
    "debug": {
      "description": "Node.js and CLI only. Prints debug messages.",
      "type": "boolean",
      "default": false
    },
    "enableRetinaScaling": {
      "type": "boolean",
      "default": false
    }
  },
  "type": "object"
}
