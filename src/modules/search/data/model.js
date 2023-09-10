import moment from 'moment'
import * as Yup from 'yup'

export const listValues = () => ({
    listid: "",
})



export const addListSchema = Yup.object({
    listid: Yup.string().required('List Name(Required)').nullable(),

})