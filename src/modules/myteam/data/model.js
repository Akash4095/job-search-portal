import * as Yup from 'yup'



export const sendInvite = () => ({
    email: ""
})

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const sendInviteSchema = Yup.object({
    email: Yup.string().email().required('Email (Required)'),
})