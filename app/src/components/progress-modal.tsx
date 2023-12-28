import { Modal, Progress } from "antd";

const ProgressModal = ({
    isModalOpen,
    percent,
}: {
    isModalOpen: boolean;
    percent: number;
}) => {
    return (
        <Modal title="Uploading" open={isModalOpen} footer={[]}>
            <div className="w-full flex justify-center items-center">

                <Progress type="circle" percent={percent} />
            </div>
        </Modal>
    );
};

export default ProgressModal;
