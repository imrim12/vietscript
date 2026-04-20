export interface TestCase {
  input: string
  expectedOutput: string
}

export type Result = TestCase & {
  result: string
}

export interface ProblemMeta {
  description?: string
  input?: string
  output?: string
  functionName?: string
  params?: string
}

export interface Problem {
  id: string
  serial: number
  title: string
  difficulty?: string
  tag?: string
  isSubmitted?: boolean
  meta_data: ProblemMeta
}
