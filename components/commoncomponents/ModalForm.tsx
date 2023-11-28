import React, { ReactNode } from "react";
import { Modal } from "antd";

interface ModalAdminProps {
  children?: ReactNode[] | ReactNode;
  open?: boolean;
  title: string;
  description?: string;
  width?: number;
  onCancel?: () => void;
}

const ModalForm = ({
  children,
  open = true,
  title,
  description,
  onCancel,
  width = 800,
}: ModalAdminProps) => {
  return (
    <Modal
      open={open}
      width={width}
      footer={null}
      destroyOnClose
      onCancel={onCancel}
    >
      <div className="modal-form-header">
        <h3 className="title">{title}</h3>
        {description && <p className={'description'}>{description}</p>}
      </div>
      {children}
    </Modal>
  );
};

export default ModalForm;
