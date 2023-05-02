import * as fs from "fs"
import { RESPONSE_MESSAGE } from "../src/constant/resp/message"
const readDb = async (keyName: string): Promise<any> => {
    const readResult = new Promise((resolve, reject) => {
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) {
                console.log("Error reading file from disk:", err)
                resolve(RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR)
            }
            try {
                const parseData = JSON.parse(data)
                resolve(parseData[keyName])
            } catch (err) {
                resolve(RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR)
            }
        })
    })
    return await Promise.resolve(readResult)
}

const writeDb = async (keyName: string, insertData: any) => {
    const read = new Promise((resolve, reject) => {
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) {
                console.log("Error reading file from disk:", err)
                resolve(RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR)
            }
            try {
                const parseData = JSON.parse(data)
                resolve(parseData)
            } catch (err) {
                resolve(RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR)
            }
        })
    })

    const readData: any = await Promise.resolve(read)

    if (typeof readData === "string") return RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR

    try {
        readData[keyName].push(insertData)
    } catch (err) {
        return RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
    }

    const writeResult = new Promise((resolve, reject) => {
        fs.writeFile("./db/db.json", JSON.stringify(readData), err => {
            if (err) {
                resolve(RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR)
            } else {
                resolve(RESPONSE_MESSAGE.SUCCESS)
            }
        })
    })

    return await Promise.resolve(writeResult)
}

const updateDb = async (keyName: string, updateData: any) => {
    const read = new Promise((resolve, reject) => {
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) {
                console.log("Error reading file from disk:", err)
                resolve(RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR)
            }
            try {
                const parseData = JSON.parse(data)
                resolve(parseData)
            } catch (err) {
                resolve(RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR)
            }
        })
    })

    const readData: any = await Promise.resolve(read)

    if (typeof readData === "string") return RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR

    try {
        const getIndex = readData[keyName].findIndex((kN: any) => kN[`${keyName}_id`] === updateData[`${keyName}_id`])
        if (getIndex > -1) readData[keyName][getIndex] = updateData
    } catch (err) {
        return RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
    }

    const writeResult = new Promise((resolve, reject) => {
        fs.writeFile("./db/db.json", JSON.stringify(readData), err => {
            if (err) {
                resolve(RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR)
            } else {
                resolve(RESPONSE_MESSAGE.SUCCESS)
            }
        })
    })

    return await Promise.resolve(writeResult)
}

export {
    readDb,
    writeDb,
    updateDb
}