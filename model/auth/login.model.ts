class AuthPostLogin {
    public username: string
    public password: string
    public error: string | undefined
    public errorExtend: string[]

    constructor(req: any) {
        this.username = req.body.username
        this.password = req.body.password
        this.error = undefined
        this.errorExtend = []

        if (this.username) {
            if (typeof this.username !== "string") this.errorExtend.push('username invalid type , ')
        } else {
            this.errorExtend.push('require username , ')
        }

        if (this.password) {
            if (typeof this.password !== "string") this.errorExtend.push('password invalid type , ')
        } else {
            this.errorExtend.push('require password , ')
        }

        if (this.errorExtend.length > 0) this.error = this.errorExtend.join(',')
    }
}

export {
    AuthPostLogin
}