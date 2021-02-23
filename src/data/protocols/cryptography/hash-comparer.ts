export interface HashComparer {
  compare: (plaitext: string, encrypted: string) => Promise<boolean>
}
