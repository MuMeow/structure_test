import * as fs from "fs"

const readDb = async (keyName: string): Promise<any> => {
    const readResult = new Promise((resolve, reject) => {
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) {
                console.log("Error reading file from disk:", err)
                resolve("Internal Server Error")
            }
            try {
                const parseData = JSON.parse(data)
                resolve(parseData[keyName])
            } catch (err) {
                resolve("Internal Server Error")
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
                resolve("Internal Server Error")
            }
            try {
                const parseData = JSON.parse(data)
                resolve(parseData)
            } catch (err) {
                resolve("Internal Server Error")
            }
        })
    })

    const readData: any = await Promise.resolve(read)

    if (typeof readData === "string") return "Internal Server Error"

    try {
        readData[keyName].push(insertData)
    } catch (err) {
        return "Internal Server Error"
    }

    const writeResult = new Promise((resolve, reject) => {
        fs.writeFile("./db/db.json", JSON.stringify(readData), err => {
            if (err) {
                resolve("Internal Server Error")
            } else {
                resolve("Success")
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
                resolve("Internal Server Error")
            }
            try {
                const parseData = JSON.parse(data)
                resolve(parseData[keyName])
            } catch (err) {
                resolve("Internal Server Error")
            }
        })
    })

    const readData = await Promise.resolve(read)

    if (typeof readData === "string") return "Internal Server Error"
}

export {
    readDb,
    writeDb,
    updateDb
}