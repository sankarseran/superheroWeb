"use client";

import { useState, useEffect, useCallback } from "react";
import { Modal, Form, Input, Rate, Select, notification } from "antd";
import { apiURL } from "../util";

interface Superhero {
  humilityRating: number;
  id?: string;
  name: string;
  powers: { id: string; name: string }[];
}

interface SuperheroFormModalProps {
  visible: boolean;
  onClose: (dataUpdated: boolean) => void;
  superhero: Superhero | null;
}

const SuperheroFormModal = ({
  visible,
  onClose,
  superhero,
}: SuperheroFormModalProps) => {
  const [form] = Form.useForm();
  const [powerOptions, setPowerOptions] = useState<{ value: string }[]>([]);
  const [api, contextHolder] = notification.useNotification();

  const fetchPowerOptions = useCallback(async () => {
    try {
      const response = await fetch(`${apiURL}/powers`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPowerOptions(
        data.map((power: { name: string }) => ({ value: power.name }))
      );
    } catch (error) {
      console.error("Error fetching power options:", error);
      api.error({
        message: "Error",
        description: "Failed to fetch power options. Please try again later.",
        showProgress: true,
        pauseOnHover: true,
      });
    }
  }, [api]);

  useEffect(() => {
    if (visible) {
      fetchPowerOptions();
      if (superhero) {
        form.setFieldsValue({
          ...superhero,
          powers: superhero.powers.map((p) => p.name),
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, superhero, form, fetchPowerOptions]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const method = superhero ? "PUT" : "POST";
      const url = superhero
        ? `${apiURL}/${superhero.id}`
        : `${apiURL}`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.status !== 201) {
        throw new Error(data.message);
      }

      api.success({
        message: "Success",
        description: data.message,
        showProgress: true,
        pauseOnHover: true,
      });

      onClose(true);
    } catch (error) {
      console.error("Validate Failed:", error);
      api.error({
        message: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to save superhero. Please try again later.",
        showProgress: true,
        pauseOnHover: true,
      });
    }
  };

  const handleCancel = () => {
    onClose(false); // Data was not updated
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={superhero ? "Edit Superhero" : "Add Superhero"}
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please input the superhero name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="humilityRating"
            label="Humility Rating"
            rules={[{ required: true, message: "Please select the rating!" }]}
          >
            <Rate count={10} />
          </Form.Item>
          <Form.Item
            name="powers"
            label="Super Powers"
            rules={[
              { required: true, message: "Please select at least one power!" },
            ]}
          >
            <Select
              mode="tags"
              placeholder="Select Powers"
              style={{ width: "100%" }}
              options={powerOptions}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SuperheroFormModal;
