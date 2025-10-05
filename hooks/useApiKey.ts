import { sha1 } from "js-sha1";
import { useState } from "react";

const useApiKey = () =>{

        const key = 'CXTZFN2U9ZVQ3LNRCHMK';
        const secret = 'xM9Txb3C39pLVzJA3W7QQtcwSD28x5g74HLdygGk';
        const [time,setTime] = useState( Math.floor(Date.now() / 1000));
        const [hash,setHash] = useState(sha1(`${key}${secret}${time}`));
    
        return {key,time,hash};
    
}
export default useApiKey;