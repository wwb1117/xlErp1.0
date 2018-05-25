import HttpClient from 'utils/HttpClient'

export default {
    // 配置流程！
    // 获取流程名称
    getprocessname(data){
        return HttpClient.get('/process/list', data)
    },
    // 根据ID获取名称
    getprocessid(id){
        return HttpClient.get(`/process/name/${id}`)
    },
    // 新增流程名称
    postprocessadd(data){
        return HttpClient.post('/process/add', data)
    },
    // 修改流程
    putprocessupdate(data){
        return HttpClient.put('/process/update', data)
    },
    // 删除流程
    delprocessid(id){
        return HttpClient.delete(`/process/delete/${id}`)
    },
    // 设置审批流程
    postprocesssetreview(data){
        return HttpClient.put('/process/setreview', data)
    },
    // 查询流程审批详情
    getprocessmoreid(id){
        return HttpClient.put(`/process/${id}`)
    },
    // 用户列表!
    // 获取用户列表
    getrolelist(data){
        return HttpClient.get('/role/list', data)
    },
    // 新增用户
    postroleadd(data){
        return HttpClient.post('/role/add', data)
    },
    // 修改用户
    putroleupdate(data){
        return HttpClient.put('/role/update/role', data)
    },
    // 删除用户
    deleteroleid(id){
        return HttpClient.delete(`/role/${id}`)
    }
}
