export const whenTypeMap: { [key: string]: string } = {
  '1': 'clicks button',
  '2': 'inputs data',
  '3': 'transfer',
}

export const thenTypeMap: { [key: string]: string } = {
  '3': 'the user transfers',
  '4': 'the user receives',
  '5': 'change',
  '6': 'the system burns',
}

export const originTypeMap: { [key: string]: string } = {
  '1': 'pool',
  '2': 'user',
  '3': 'minter',
}

export const targetTypeMap: { [key: string]: string } = {
  '1': 'pool',
  '2': 'user',
  '3': 'tag',
}

export const destinationTypeMap: { [key: string]: string } = {
  '1': 'pool',
  '2': 'burner',
}

export const variableTypeMap: { [key: string]: string } = {
  '1': 'current',
  '2': 'global',
  '3': 'defined',
}

export const symbolMap: { [key: string]: string } = {
  '1': "(",
  '2': "[",
  '3': ")",
  '4': "]",
}

export const scenarioTypeMap: { [key: string]: string } = {
  '1': "recieved",
  '2': "",
  '3': "transfered"
}

export const timeTypeMap: { [key: string]: string } = {
  '3': "hour",
  '4': "day",
} 
