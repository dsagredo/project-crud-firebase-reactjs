import React from "react";
import {Button, Table, Tag, Space} from "antd";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
const {Column} = Table;

const ListItem = ({tasks, isDisabled, editTask, deleteTask}) => (
    <Table dataSource={tasks}>
        <Column title="Tarea" dataIndex="tarea" key="tarea" />
        <Column
            title="Estado"
            dataIndex="estado"
            key="estado"
            render={(value) => {
                let status = "";
                switch (value) {
                    case 1:
                        status = "No iniciada";
                        break;
                    case 2:
                        status = "Completada";
                        break;
                    case 3:
                        status = "En curso";
                        break;
                    default:
                        status = "";
                        break;
                }
                let color = "";
                if (value === 1) {
                    color = "#f5222d";
                }
                if (value === 2) {
                    color = "#52c41a";
                }
                if (value === 3) {
                    color = "#fadb14";
                }
                return <Tag color={color}>{status}</Tag>;
            }}
        />
        <Column
            title="Acción"
            key="accion"
            render={({key}) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        onClick={editTask(key)}
                        icon={<EditOutlined />}
                        disabled={isDisabled}
                    />
                    <Button
                        type="primary"
                        onClick={deleteTask(key)}
                        danger
                        icon={<DeleteOutlined />}
                        disabled={isDisabled}
                    />
                </Space>
            )}
        />
    </Table>
);

export default ListItem;
