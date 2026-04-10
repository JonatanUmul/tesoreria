import {postItemCode, putItemCode, workflowItemCode, itemCodeId, updateItemCod} from "../api/itemCode.api.js"

export const fetchItemCode = async(values) => {
    const res = await postItemCode(values)
    return res
}
export const updateItemCode = async(values) => {
    const res = await putItemCode(values)
    return res
}

export const updateItem = async(values) => {
    const res = await updateItemCod(values)
    return res
}

export const runWorkflowItemCode = async() => {
    const res = await workflowItemCode()
    return res
}

export const getItemcodeId = async(idItemCode) =>{
    const res = await itemCodeId(idItemCode)
    return res
}