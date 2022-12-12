//import { TMBD_POSTER_w45 } from "../../lib/constants";

const StreamingListUsers = ({service}) => {
    return (
        <li className="inline-flex h-10 w-12 my-1 m-auto">
            <img 
                id={"service_img_" + service.provider_name} 
                //src={TMBD_POSTER_w45 + service.logo_path}
                src={'/ServicesImages/' + service.provider_id + '.jpg'} 
                alt={service.provider_id}
                className="h-10 w-10 mx-auto rounded-xl"
                title={service.provider_name}
            />
        </li>
    );
};

export default StreamingListUsers;