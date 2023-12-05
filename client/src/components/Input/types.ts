type IInput = {
  id: string
  value: string
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  placeholder: string
}