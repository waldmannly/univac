// import { Token } from 'antlr4'
import { Language, Node } from 'univac'
import { AstGraphViewOptions, defaultAstGraphViewOptions } from '../ui/astGraph/graphViewControls'
import { getAst } from './dispatchers'
import { Example, examples } from "./examples"

export interface State {
  example: Example
  language: Language
  ast: Node;
  expandedNodes: Node[]
  expandNegated: boolean
  nodeAtCursor: Node,
  astAutoUpdate: boolean;
  astShowText: boolean
  logs: string[];
  error?: Error | ParserError | ParserError[] | undefined;
  examples: Example[];
  sidebarVisibility: boolean;
  currentTab: number
  astViewer: 'evenParent' | 'tidyTreeView' | 'dot' | 'patchwork' | 'fdp' | 'neato',
  argGraphViewOptions: AstGraphViewOptions
}
export const astViewers = ['dot', 'patchwork', 'neato', 'evenParent', 'fdp', 'tidyTreeView']
export interface ParserError {
  offendingSymbol: any
  line: number
  column: number
  msg: string
  e: any
}

export async function getInitialState(): Promise<State> {
  const example = examples[0]
  const { ast, error } = await getAst(example.code, example.language)
  return {
    example,
    expandNegated: true,
    language: example.language,
    ast: ast!,
    error,
    astShowText: true,
    expandedNodes: [],
    astAutoUpdate: false,
    nodeAtCursor: ast!,
    logs: [],
    sidebarVisibility: false,
    examples: [],
    currentTab: 0,
    astViewer: 'dot',
    argGraphViewOptions: defaultAstGraphViewOptions
  }
}
