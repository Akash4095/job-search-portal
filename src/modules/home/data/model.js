import moment from 'moment'
import * as Yup from 'yup'

export const updateProfileValues = () => ({
    menu_name: "",
    rlb_module_type: "",
    gstin: "",

})



export const updateProfileValuesSchema = Yup.object({
    domain_alias: Yup.string().required('Domain Alias (Required Field)').nullable(),
    cid: Yup.string().required('Company Id (Required Field)').nullable(),
    menu_name: Yup.string().required('Menu Name (Required Field)').nullable(),
    rlb_box_id: Yup.string().required('RLB BoxId (Required Field)').nullable(),

})