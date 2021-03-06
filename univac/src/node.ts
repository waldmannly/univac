import { indent, unique } from 'misc-utils-of-mine-generic'
import { Node, NodePositionLineColumn } from './types'

export function printNodeText(text: string, maxLength = 160, escape = true) {
  const s = text.substring(0, Math.min(text.length, maxLength))
  return escape ? s.replace(/"/gm, '\\"').replace(/[\n]+/gm, '\\n') : s
}

export function visitDescendants({ node: n, visitor: v, childrenFirst = true, parent, level = 0 }: { node: Node, visitor: (n: Node, parent?: Node | undefined, level?: number | undefined) => boolean, childrenFirst?: boolean, parent?: Node, level?: number }): boolean {
  if (!n) {
    return false
  }
  if (!childrenFirst && v(n, parent, level)) {
    return true
  }
  if (!n.children.some((c: any) => visitDescendants({ node: c, visitor: v, childrenFirst, parent: n, level: level + 1 }))) {
    return childrenFirst && v(n, parent, level)
  } else {
    return true
  }
}

/**
 * Adds parents to given node and descendants. If parents are detected, it does nothing. Useful in cases where the ast was generated without parents to add them programmatically after. 
 */
export function addParents(n: Node) {
  n.children.forEach(c => {
    c.parent = n
    addParents(c)
  })
}

/**
 * Gets the minimal node containing given position
 */
export function getNodeAtPosition(node: Node, position: NodePositionLineColumn): Node | undefined {
  function includes(n: Node, p: NodePositionLineColumn) {
    return n && (n.start!.line <= p.line) &&
      (n.stop!.line >= p.line)
  }
  let found: Node | undefined
  function find(n: Node, p: NodePositionLineColumn): Node | undefined {
    if (includes(n, p)) {
      if (!n.children.length) {
        found = n
        return n
      }
      const cc = n.children.find(c => !!find(c, p))
      if (!cc) {
        found = n
        return n
      }
      return found || cc || n
    }
  }
  return find(node, position)
}

export function printNode({ node, level = 0 }: { node: Node, level?: number }): string {
  return (`
<${node.type}${node.text ? ` text="${printNodeText(node.text)}"` : ''}>
${node.children.length ?
      `${indent(level + 1)}${node.children.map(c => printNode({ node: c, level: level + 1 })).join('') + '\n'}` : ''}${indent(level)}</${node.type}>
  `.trim()
  )
    .replace(/\>\</gm, '\> \<')
}

export function getNodeId(n: Node) {
  if (!(n as any).__id) {
    (n as any).__id = unique('node')
  }
  return (n as any).__id
}
