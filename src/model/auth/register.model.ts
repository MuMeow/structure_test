class AuthPostRegister {
    public username: string
    public password: string
    public fullname: string
    public error: string | undefined
    public errorExtend: string[]

    constructor(req: any) {
        this.username = req.body.username
        this.password = req.body.password
        this.fullname = req.body.fullname
        this.error = undefined
        this.errorExtend = []

        if (this.username) {
            if (typeof this.username !== "string") this.errorExtend.push('username invalid type')
        } else {
            this.errorExtend.push('require username')
        }

        if (this.password) {
            if (typeof this.password !== "string") this.errorExtend.push('password invalid type')
        } else {
            this.errorExtend.push('require password')
        }

        if (this.fullname) {
            if (typeof this.fullname !== "string") this.errorExtend.push('fullname invalid type')
        } else {
            this.errorExtend.push('require username')
        }

        if (this.errorExtend.length > 0) this.error = this.errorExtend.join(' , ')
    }
}

export {
    AuthPostRegister
}

