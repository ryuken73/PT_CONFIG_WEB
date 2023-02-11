import axios from 'axios';
import Constants from 'config/constants';

const { SERVER_URL } = Constants;

const axiosRequest = {
    async putAttach(params, blob, updateProgress) {
        const {fname, size, srcId} = params;
        try {
            const options = {
                ...this.options,
                headers : {
                    ...this.options.headers,
                    'Content-Type':'application/octet'
                },
                onUploadProgress(progressEvent) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    const percentStrig = `${percentCompleted}%`;
                    updateProgress(percentStrig);
                }
            }

            const putUrl = `${SERVER_URL}/attach?fname=${fname}&size=${size}&srcId=${srcId}`
            const response = await axios.put(putUrl, blob, options);

            if(response.status === 200 && response.data.success){
                console.log('complete');
                return response.data;
            } else {
                updateProgress('0%');
            }
        } catch(err) { 
            console.error(err)
            return {success:false};
        }
    },

    async putAsset(params) {
        const {assetTitle, displayMode, sources} = params;
        try {
            const options = {
                ...this.options
            }
            const putUrl = `${SERVER_URL}/asset`;
            const postParams = { assetTitle, displayMode, sources };
            const response = await axios.put(putUrl, postParams, options);
            if(response.status === 200 && response.data.success){
                    return response.data;
            }
            return {success:false};
        } catch(err) { 
            console.error(err)
            return {success:false};
        }
    },

    async postAsset(params) {
        const {assetId, assetTitle, displayMode, sources, isFavorate} = params;
        try {
            const options = {
                ...this.options
            }
            const postUrl = `${SERVER_URL}/asset/${assetId}`;
            const postParams = { assetTitle, displayMode, sources, isFavorate };
            const response = await axios.post(postUrl, postParams, options);
            if(response.status === 200 && response.data.success){
                    return response.data;
            }
            return {success:false};
        } catch(err) { 
            console.error(err)
            return {success:false};
        }
    },

    async getAssetList(){
        try {
            const options = {
                ...this.options,
            }
            const url = `${SERVER_URL}/assetList`
            const response = await axios.get(url, options);
            if(response.status === 200){
                return response.data;
            }
            return null;            
        } catch (err) { 
            console.error(err);
            return null;
        }
    },  

    async getAssetsActive(){
        try {
            const options = {
                ...this.options,
            }
            const url = `${SERVER_URL}/assetsActive`
            const response = await axios.get(url, options);
            if(response.status === 200){
                return response.data;
            }
            return null;            
        } catch (err) { 
            console.error(err);
            return null;
        }
    },  

    async putAssetsActive(params) {
        const {assetsActive} = params;
        try {
            const options = {
                ...this.options
            }
            const putUrl = `${SERVER_URL}/assetsActive`;
            const postParams = { assetsActive };
            const response = await axios.put(putUrl, postParams, options);
            if(response.status === 200 && response.data.success){
                    return response.data;
            }
            return {success:false};
        } catch(err) { 
            console.error(err)
            return {success:false};
        }
    },

    async deleteAssetActive(params) {
        const {assetId} = params;
        try {
            const options = {
                ...this.options
            }
            const url = `${SERVER_URL}/assetsActive/${assetId}`;
            const response = await axios.delete(url, '', options);
            if(response.status === 200 && response.data.success){
                    return response.data;
            }
            return {success:false};
        } catch(err) { 
            console.error(err)
            return {success:false};
        }
    },

    async resetToDefault() {
        try {
            const options = {
                ...this.options
            }
            const putUrl = `${SERVER_URL}/assetList/default`;
            const response = await axios.put(putUrl, {} , options);
            if(response.status === 200 && response.data.success){
                    return response.data;
            }
            return {success:false};
        } catch(err) { 
            console.error(err)
            return {success:false};
        }
    },

    async delAsset(params) {
        const {assetId} = params;
        try {
            const options = {
                ...this.options
            }
            const url = `${SERVER_URL}/asset/${assetId}`;
            const response = await axios.delete(url, '', options);
            if(response.status === 200 && response.data.success){
                    return response.data;
            }
            return {success:false};
        } catch(err) { 
            console.error(err)
            return {success:false};
        }
    },

    async getTypeList(){
        try {
            const options = {
                ...this.options,
            }
            const url = `${SERVER_URL}/typeList`
            const response = await axios.get(url, options);
            if(response.status === 200 && response.data.success){
                console.log('$$$ axios typeList', response, response.data)
                return response.data;
            }
            return null;            
        } catch (err) { 
            console.error(err);
            return null;
        }
    },  

    async putType(params) {
        const {typeId} = params;
        try {
            const options = {
                ...this.options
            }
            const putUrl = `${SERVER_URL}/type`;
            const postParams = { typeId };
            const response = await axios.put(putUrl, postParams, options);
            if(response.status === 200 && response.data.success){
                    return response.data;
            }
            return {success:false};
        } catch(err) { 
            console.error(err)
            return {success:false};
        }
    },


    // old code
    async requestVerifySecret(url, params){
        const {secretReqID, user_nm, dept_nm, handphone_nbr, secret} = params;
        try {
            console.log(params);
            const postParams = {
                request_id : secretReqID,
                user_nm : user_nm,
                dept_nm : dept_nm,
                handphone_nbr : handphone_nbr,
                secret : secret                
            }
            const response = await axios.post(url, postParams);
            if(response.status === 200 && response.data.success){
                return response.data;
            }
            return {success:false};              

        } catch (err){
            console.error(err);
            return {success:false};
        }
    },
    async requestVerifyToken(url, params){
        const {user_id, token} = params;
        try {
            console.log(params);
            const postParams = {
                user_id : user_id,
                token
            }
            const response = await axios.post(url, postParams);
            if(response.status === 200 && response.data.success){
                return {success:true};
            }
            return {success:false};              

        } catch (err){
            console.error(err);
            return {success:false};
        }
    },

    async postBody(url, params) {
        const {user_id, user_nm, dept_nm, sr_body} = params;
        try {
            // if need authorization using user_id and token, don't foret using options 
            // (with HOC, user_id and token will be set automatically)
            const options = {
                ...this.options
            }
            console.log(options);
            const response = await axios.post(url, {user_id:user_id , user_nm:user_nm, dept_nm:dept_nm, sr_body:sr_body}, options);
            if(response.status === 200 && response.data.success){
                    return response.data;
            }
            return {success:false};
        } catch(err) {
            console.error(err)
            return {success:false};
        }
    },

    async putBody(url, params) {
        const {case_id, user_id, user_nm, dept_nm, sr_body} = params;
        try {
            const options = {
                ...this.options
            }
            const putUrl = `${url}/${case_id}`
            const response = await axios.put(putUrl, {user_id:user_id, user_nm:user_nm, dept_nm:dept_nm, sr_body:sr_body}, options);
            if(response.status === 200 && response.data.success){
                    return response.data;
            }
            return {success:false};
        } catch(err) { 
            console.error(err)
            return {success:false};
        }
    },

    async sendImage(url, params, updateStatus, updateProgress, updateFileID) {
        const {case_id, image} = params;
        try {
            const {blob, file_nm} = image;
            const postUrl = `${url}/${case_id}`;
            // if need authorization using user_id and token, don't foret using options 
            // (with HOC, user_id and token headers will be set automatically)
            // if need use addtional headers, use spread operator befor ( it looks a little bad pattern!)
            const options = {
                ...this.options,
                headers : {
                    ...this.options.headers,
                    'Content-Type':'application/octet',
                    'X-SBSSR-FILENAME' : file_nm
                },
                onUploadProgress(progressEvent) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    const percentStrig = `${percentCompleted}%`;
                    updateProgress(percentStrig);
                }
            }
            const response = await axios.post(postUrl, blob, options);
            if(response.status === 200 && response.data.success){
                console.log('complete');
                updateStatus('Complete');
                updateFileID(response.data.file_id);
                return response.data;
            } else {
                updateProgress('0%');
            }
            return {success:false};
        } catch(err) {
            console.error(err);
            updateProgress('0%');
            return {success:false};
        }
    },

    async deleteImage(url, params){
        const {case_id, file_id, file_nm} = params;
        try {
            const deleteUrl = `${url}/${case_id}/${file_id}`;
            const options = {
                ...this.options,
                headers : {
                    ...this.options.headers,
                    'X-SBSSR-FILENAME' : file_nm
                }
            }
            const response = await axios.delete(deleteUrl, options);
            if(response.status === 200 && response.data.success){
                console.log('complete');
                return response.data;
            } 
            return {success:false};           

        } catch(err) {
            console.error(err);
            return {success:false};
        }
    },

    async getRecentCase(url, params){
        const {user_id} = params;
        try {
            const getUrl = `${url}?user_id=${user_id}`;
            const options = {
                ...this.options
            }
            const response = await axios.get(getUrl, options);
            if(response.status === 200 && response.data.success){
                console.log('complete');
                console.log(response.data)
                return response.data;
            } 
            return {success:false};              

        } catch(err) {
            console.error(err)
            return {success:false};
        }
    },

    async getAttach(url, params){
        try {
            const options = {
                ...this.options,
                responseType : 'blob'
            }
            const response = await axios.get(url, options);
            if(response.status === 200){
                return response.data;
            }
            return null;            
        } catch (err) { 
            console.error(err);
            return null;
        }
    },  

    async getSRList(params){
        const {user_id} = params;
        try {
            const url = Constants.URLS.REQUEST_SRLIST;
            const getUrl = `${url}?user_id=${user_id}`;
            const options = {
                ...this.options
            }
            const response = await axios.get(getUrl, options);
            if(response.status === 200 && response.data.success){
                console.log('complete');
                console.log(response.data)
                return response.data;
            } 
            return {success:false, code:response.data.code};              

        } catch(err) {
            console.error(err)
            return {success:false};
        }
    },

    async getSRListAdmin(params){
        const {fromDate, toDate} = params;
        try {
            const url = Constants.URLS.REQUEST_SRLIST_ADMIN;
            const getUrl = `${url}?fromDate=${fromDate}&toDate=${toDate}`;
            const options = {
                ...this.options
            }
            const response = await axios.get(getUrl, options);
            if(response.status === 200 && response.data.success){
                console.log('complete');
                console.log(response.data)
                return response.data;
            } 
            return {success:false, code:response.data.code};              

        } catch(err) {
            console.error(err)
            return {success:false};
        }
    }

}

const withHeader = (requester) => (user_id=null, token=null) => {
    const source = axios.CancelToken.source()
    requester.options = {
        cancelToken: source.token,
        headers : {
            'X-TARGET_SYSTEM' : 'Touch-Screen'
        }
    }
    return [requester, source];
};

//export default axiosRequest;
export default withHeader(axiosRequest)