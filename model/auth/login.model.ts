import UniversalRequest,{UNIVERSAL_REQUEST} from '../UniversalRequest.model'
import * as jwt from 'jsonwebtoken'

class AuthPostRegister  {
    public token: string
    public userId: number
    public error: string | undefined

    constructor(
        token: string,
    ) {
        super()
        this.token = token
        this.userId = 0
        this.error = undefined;

        const tokenDecode: any = jwt.decode(token) as { user_id: number; permisson: string }

        if (tokenDecode !== null) {
            this.userId = tokenDecode.user_id
        }

        const validateForm: IValidateParameter<UNIVERSAL_REQUEST>[] = []
        validateForm.push(
            {
                keyName: 'token',
                keyValue: this.token,
                format: UNIVERSAL_REQUEST.STRING,
                regex: new RegExp('')
            }
        )
        this.error = super.validateParameter(validateForm)
    }
}

export {
    GetAgentme,
}

