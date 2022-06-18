export const illustrateData = {
  "ruleId": "7050561014341",
  "ruleName": "complex rule",
  "whenType": "3",
  "when": {
    "componentId": "7050891125061",
    "originType": "2",
    "origin": {
      "assetId": "6965013294277",
      "codename": "RCH"
    },
    "targetType": "1",
    "target": [
      {
        "targetId": "7050891126469",
        "destinationType": "1",
        "assetId": "6965013294277",
        "codename": "RCH",
        "systemId": "6953376520005",
        "systemName": "test system",
        "poolId": "6953257906757",
        "poolName": "test pool",
        "percent": 40.0
      },
      {
        "targetId": "7050891127237",
        "destinationType": "2",
        "assetId": "6965039141829",
        "codename": "TCA",
        "systemId": "6953397499333",
        "systemName": "test system",
        "poolId": "6953284007493",
        "poolName": "test pool",
        "percent": 60.0
      }
    ]
  },
  "thenType": "5",
  "then": [
    {
      "componentId": "7050936312517",
      "variableId": "6986075320389",
      "variableName": "current value 01",
      "variableType": "1"
    }
  ]
}


export const scenariosData = [
  {
    "scenarioId": "7271548466501",
    "scenarioType": "1",
    "componentId": "7251437950533",
    "range": {
      "rangeType": "1",
      "startSymbol": "1",
      "minType": "1",
      "minValue": "0",
      "maxType": "1",
      "maxValue": "100",
      "endSymbol": "4"
    },
    "restriction": [
      {
        "restrictionType": "1",
        "restriction": {
          "conditionId": "7252318929477",
          "cycleTime": 10,
          "callTimes": 100
        }
      }
    ],
    "formula": "1+2",
    "sort": 0,
    "last": 0
  }
]

export const accessibleData = [
  {
    "accessibleId": "7119054944453",
    "accessible": [
      {
        "restrictionType": "5",
        "condition": {
          "conditionId": "7119012271813",
          "variableId": "6986075320389",
          "variableName": "current value 01",
          "range": {
            "rangeType": "1",
            "startSymbol": "1",
            "minValue": "0",
            "maxValue": "100",
            "endSymbol": "4"
          }
        }
      }
    ]
  }
]