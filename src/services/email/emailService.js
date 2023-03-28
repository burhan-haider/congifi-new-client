import httpService from "services/httpservice/httpService";

class emailService {

    refreshEmail = async() => {
        return new Promise((resolve, reject)=>{
            httpService.post('/api/email/refreshEmail',
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem(
                            "cognifi_token"
                        )}`
                    }
                }
            )
            .then(res=>{
                if(res.status === 200){
                    resolve(res.data)
                }
            })
            .catch(err=>{
                reject(err)
            })
        })
    }

    fetchEmails = async caseNo => {
        return new Promise((resolve, reject)=>{
            httpService.post('/api/email/showAllMessage',
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem(
                            "cognifi_token"
                        )}`
                    }
                },
                {
                    params: {
                        caseNo: caseNo,
                    }
                }
            )
            .then(res=>{
                if(res.status === 200){
                    resolve(res.data)
                }
            })
            .catch(err=>{
                reject(err)
            })
        })
    }

    sendEmail = async formData => {
        return new Promise((resolve, reject)=>{
            httpService.post('/api/email/sendEmail', formData, 
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${window.localStorage.getItem(
                            "cognifi_token"
                        )}`
                    }
                }
            )
            .then(res=>{
                if(res.status===200){
                    resolve(res.data)
                }
            })
            .catch(err=>{
                reject(err)
            })
        })
    }

    showEmail = async formData => {
        return new Promise((resolve, reject)=>{
            httpService.post('/api/email/showMessage', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${window.localStorage.getItem(
                        "cognifi_token"
                    )}`
                }
            })
            .then(res=>{
                if(res.status===200){
                    resolve(res.data)
                }
            })
            .catch(err=>{
                reject(err)
            })
        })
    }
}

const instance = new emailService();

export default instance;