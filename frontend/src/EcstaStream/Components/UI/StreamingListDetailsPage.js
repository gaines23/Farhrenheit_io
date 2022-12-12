import { TMBD_POSTER_w45 } from "../../lib/constants";

const StreamingList = ({service}) => {
    return (
            <div className="h-10 w-10 p-1">
                <img 
                    id={"service_img_" + service.provider_name}
                    src={'/ServicesImages/' + service.provider_id + '.jpg'} 
                    //src={`${TMBD_POSTER_w45}${service.logo_path}`}
                    alt={service.provider_id}
                    className="rounded-xl"
                    title={service.provider_name}
                />
            </div>
    );
};

export default StreamingList;