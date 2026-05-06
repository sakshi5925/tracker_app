import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";

import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { API } from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TaskScreen({ navigation }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState<any>(null);

  const queryClient = useQueryClient();


  const { data, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await API.get("/tasks");
      return res.data;
    },
  });

  const createTask = useMutation({
    mutationFn: (task: any) =>
      API.post("/tasks", task),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      }),
  });


  const deleteTask = useMutation({
    mutationFn: (id: string) =>
      API.delete(`/tasks/${id}`),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      }),
  });


  const toggleTask = useMutation({
    mutationFn: (task: any) =>
      API.patch(`/tasks/${task._id}`, {
        completed: !task.completed,
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      }),
  });


  const updateTask = useMutation({
    mutationFn: (task: any) =>
      API.patch(`/tasks/${task.id}`, {
        title: task.title,
        description: task.description,
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      }),
  });


  const filteredTasks =
    filter === "all"
      ? data
      : data?.filter((t: any) =>
        filter === "done"
          ? t.completed
          : !t.completed
      );

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="#6C63FF"
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <View>
          <Text style={styles.heading}>
            My Tasks
          </Text>

          <Text style={styles.subHeading}>
            Organize your day beautifully
          </Text>
        </View>

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={async () => {
            await AsyncStorage.removeItem(
              "token"
            );

            navigation.navigate("Login");
          }}
        >
          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>


      <View style={styles.inputCard}>
        <TextInput
          placeholder="Task title"
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <TextInput
          placeholder="Task description"
          placeholderTextColor="#999"
          value={description}
          onChangeText={setDescription}
          multiline
          style={[
            styles.input,
            styles.descriptionInput,
          ]}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            if (!title.trim()) return;

            if (editingTask) {
              updateTask.mutate({
                id: editingTask._id,
                title,
                description,
              });

              setEditingTask(null);
            } else {
              createTask.mutate({
                title,
                description,
              });
            }

            setTitle("");
            setDescription("");
          }}
        >
          <Text style={styles.addButtonText}>
            {editingTask
              ? "UPDATE TASK"
              : "ADD TASK"}
          </Text>
        </TouchableOpacity>
      </View>


      <View style={styles.filterContainer}>
        {["all", "done", "pending"].map(
          (f) => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterBtn,
                filter === f &&
                styles.activeFilterBtn,
              ]}
              onPress={() =>
                setFilter(f)
              }
            >
              <Text
                style={[
                  styles.filterText,
                  filter === f &&
                  styles.activeFilterText,
                ]}
              >
                {f.toUpperCase()}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>

     
      {filteredTasks?.length === 0 && (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>
            No tasks yet 
          </Text>
        </View>
      )}

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        onRefresh={() =>
          queryClient.invalidateQueries({
            queryKey: ["tasks"],
          })
        }
        refreshing={isLoading}
        renderItem={({ item }) => (
          <View
            style={[
              styles.taskCard,
              item.completed
                ? styles.completedCard
                : styles.pendingCard,
            ]}
          >
            <View style={styles.taskTop}>
              <View style={styles.circle} />

              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.taskTitle,
                    item.completed &&
                    styles.completedTask,
                  ]}
                >
                  {item.title}
                </Text>

                {!!item.description && (
                  <Text
                    style={
                      styles.taskDescription
                    }
                  >
                    {item.description}
                  </Text>
                )}
              </View>
            </View>

            {/* BUTTONS */}
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => {
                  setEditingTask(item);

                  setTitle(item.title);

                  setDescription(
                    item.description || ""
                  );
                }}
              >
                <Text style={styles.btnText}>
                  Edit
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.doneBtn}
                onPress={() =>
                  toggleTask.mutate(item)
                }
              >
                <Text style={styles.btnText}>
                  {item.completed
                    ? "Undo"
                    : "Done"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() =>
                  deleteTask.mutate(item._id)
                }
              >
                <Text style={styles.btnText}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7FB",
    paddingHorizontal: 16,
    paddingTop: 10,

  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  heading: {
    fontSize: 30,
    fontWeight: "800",
    color: "#222",
    padding: 20
  },

  subHeading: {
    color: "#777",
    marginTop: 3,
    fontSize: 13,
    padding: 16
  },

  logoutBtn: {
    backgroundColor: "#FF5C5C",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 16
  },

  logoutText: {
    color: "#fff",
    fontWeight: "700",
  },

  inputCard: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 16,
    marginBottom: 18,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
    margin: 20
  },

  input: {
    backgroundColor: "#F2F4F8",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    marginBottom: 12,
    color: "#222",
  },

  descriptionInput: {
    minHeight: 90,
    textAlignVertical: "top",
  },

  addButton: {
    backgroundColor: "#6C63FF",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 4,
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "800",
    letterSpacing: 1,
  },

  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
    margin: 16
  },

  filterBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: "#EDEEF5",
    marginHorizontal: 4,
    alignItems: "center",
  },

  activeFilterBtn: {
    backgroundColor: "#6C63FF",
  },

  filterText: {
    color: "#555",
    fontWeight: "700",
    fontSize: 12,
  },

  activeFilterText: {
    color: "#fff",
  },

  emptyBox: {
    alignItems: "center",
    marginTop: 40,
  },

  emptyText: {
    color: "#777",
    fontSize: 15,
  },

  taskCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    margin: 16
  },

  taskTop: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  circle: {
    width: 14,
    height: 14,
    borderRadius: 20,
    backgroundColor: "#6C63FF",
    marginTop: 5,
    marginRight: 12,
  },

  taskTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
  },

  taskDescription: {
    marginTop: 6,
    color: "#777",
    lineHeight: 20,
    fontSize: 13,
  },

  completedTask: {
    textDecorationLine: "line-through",
    color: "#999",
  },

  actionRow: {
    flexDirection: "row",
    marginTop: 18,
    justifyContent: "flex-end",
  },

  editBtn: {
    backgroundColor: "#4C8BF5",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginLeft: 8,
  },

  doneBtn: {
    backgroundColor: "#34C759",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginLeft: 8,
  },

  deleteBtn: {
    backgroundColor: "#FF5C5C",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginLeft: 8,
  },

  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
  completedCard: {
    backgroundColor: "#E8F8EE", 
    borderLeftWidth: 6,
    borderLeftColor: "#34C759",
  },

  pendingCard: {
    backgroundColor: "#FFF4E8",
    borderLeftWidth: 6,
    borderLeftColor: "#FF9500",
  },
});