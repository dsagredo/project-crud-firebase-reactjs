import React, {useState, useEffect} from "react";
import "moment/locale/es";
import locale from "antd/lib/locale/es_ES";
import ListItem from "./components/ListItem";
import {
    getTasks,
    getStatus,
    create,
    update,
    remove,
    edit,
} from "./services/tasks.service";
import {
    Layout,
    Input,
    Select,
    ConfigProvider,
    message,
    Row,
    Col,
    Button,
} from "antd";
const {Header, Footer, Content} = Layout;
const {Option} = Select;

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [status, setStatus] = useState([]);
    const [item, setItem] = useState();
    const [isEditing, setEditing] = useState(false);
    const [isDisabled, setDisabled] = useState(false);

    useEffect(() => {
        getTasks().on("value", (snapshot) => {
            const arrTasks = [];
            snapshot.forEach((dataSnapshot) => {
                const key = dataSnapshot.key;
                const data = dataSnapshot.val();
                arrTasks.push({key, ...data});
            });
            setTasks(arrTasks);
        });
    }, []);

    useEffect(() => {
        getStatus().on("value", (snapshot) => {
            const items = snapshot.val();
            for (let key in items) {
                setStatus(items[key]);
            }
        });
    }, []);

    const onChangeField = (e) => {
        const value = e.target.value;
        setItem({
            ...item,
            [e.target.name]: value,
        });
    };

    const onChangeSelect = (value) => {
        setItem({
            ...item,
            estado: value,
        });
    };

    const addTask = () => {
        create(item)
            .then(() => {
                setItem({tarea: "", estado: 0});
                message.success("Se ha guardado correctamente.");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const updateTask = () => {
        console.log("item222", item);
        const {key} = item;
        setEditing(false);
        setDisabled(false);
        update(key, item)
            .then(() => {
                setItem({tarea: "", estado: 0});
                message.success("Se ha actualizado.");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const editTask = (key) => () => {
        setEditing(true);
        setDisabled(true);
        edit(key)
            .then((snapshot) => {
                const item = snapshot.val();
                setItem({key: key, ...item});
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const deleteTask = (key) => () => {
        remove(key)
            .then(() => {
                message.success("Se ha eliminado correctamente.");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const cancelTask = () => {
        setDisabled(false);
        setItem({tarea: "", estado: 0});
    };

    return (
        <>
            <ConfigProvider locale={locale}>
                <Layout
                    style={{
                        backgroundColor: "#fff",
                    }}
                >
                    <Row>
                        <Col span={12} offset={6}>
                            <Header
                                style={{
                                    textAlign: "center",
                                    backgroundColor: "#fff",
                                    fontWeight: "bold",
                                    fontSize: 18,
                                }}
                            >
                                LISTA DE TAREAS PENDIENTES
                            </Header>
                            <Content>
                                <div style={{marginBottom: 20}}>
                                    <Row
                                        gutter={{xs: 8, sm: 16, md: 24, lg: 32}}
                                    >
                                        <Col className="gutter-row" span={6}>
                                            <Input
                                                placeholder="Agregar un nueva tarea"
                                                onChange={onChangeField}
                                                name="tarea"
                                                value={item?.tarea}
                                            />
                                        </Col>
                                        <Col className="gutter-row" span={6}>
                                            <Select
                                                defaultValue={0}
                                                value={item?.estado}
                                                onChange={onChangeSelect}
                                            >
                                                {status.map((item, index) => (
                                                    <Option
                                                        value={item.id}
                                                        key={index}
                                                    >
                                                        {item.nombre}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Col>
                                        <Col className="gutter-row" span={4}>
                                            <Button
                                                type="primary"
                                                onClick={
                                                    isEditing
                                                        ? updateTask
                                                        : addTask
                                                }
                                                disabled={
                                                    !item?.tarea ||
                                                    !item?.estado
                                                }
                                                block
                                            >
                                                {isEditing
                                                    ? "Actualizar"
                                                    : "Agregar"}
                                            </Button>
                                        </Col>
                                        <Col className="gutter-row" span={4}>
                                            <Button
                                                type="danger"
                                                onClick={cancelTask}
                                            >
                                                Cancelar
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                                <ListItem
                                    tasks={tasks}
                                    isDisabled={isDisabled}
                                    editTask={editTask}
                                    deleteTask={deleteTask}
                                />
                            </Content>
                            <Footer
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                DSagredo
                            </Footer>
                        </Col>
                    </Row>
                </Layout>
            </ConfigProvider>
        </>
    );
};

export default App;
