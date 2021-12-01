import { Interface } from "@ethersproject/abi"

export const LINE_LENGTH = 100
export const LINE_PRICE = 0.001
export const LINES_PER_TX = 10

export const WALL_ADDRESS = "0xfce92D3E4F08c683648563DA36B15681C8E04B55"
export const WALL_ABI = new Interface([
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "lineLength",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "linePrice",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "int256",
        "name": "uid",
        "type": "int256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "str",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "refTo",
        "type": "int256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "edits",
        "type": "uint256"
      }
    ],
    "name": "LineUpdated",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "LINE_LENGTH",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "LINE_PRICE",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "startIndex",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "amount",
        "type": "int256"
      }
    ],
    "name": "getLines",
    "outputs": [
      {
        "components": [
          {
            "internalType": "int256",
            "name": "uid",
            "type": "int256"
          },
          {
            "internalType": "string",
            "name": "str",
            "type": "string"
          },
          {
            "internalType": "int256",
            "name": "refTo",
            "type": "int256"
          },
          {
            "internalType": "uint256",
            "name": "edits",
            "type": "uint256"
          }
        ],
        "internalType": "struct TheWall.ExportLine[]",
        "name": "out",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "strings",
        "type": "string[]"
      },
      {
        "internalType": "int256[]",
        "name": "uids",
        "type": "int256[]"
      }
    ],
    "name": "uploadLines",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
])