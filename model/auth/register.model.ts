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

        if (this.errorExtend.length > 0) this.error = this.errorExtend.join(',')
    }
}

export {
    AuthPostRegister
}

