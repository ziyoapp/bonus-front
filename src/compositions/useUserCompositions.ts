import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { USER_ROLES } from "@/shared/constants";
import { toastController } from "@ionic/vue";

const useUserCompositions = () => {
  const store = useStore();
  const router = useRouter();

  const userRole = computed(() => {
    return store.getters["userModule/getUserRoleId"];
  });

  const isAdminOrModerator = computed(() => {
    return Number(userRole.value) !== USER_ROLES.USER;
  });

  const isUser = computed(() => {
    return Number(userRole.value) === USER_ROLES.USER;
  });

  const logOut = () => {
    store.dispatch("auth/signOut").then(() => {
      router.push("/auth");
    });
  };

  const formatFn = (dateString: string) => {
    const date = new Date(dateString);
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return `${date.getFullYear()}-${month}-${day}`;
  };

  const showNotify = async (data: {
    type: string;
    duration: number;
    position: "top" | "bottom" | "middle";
    message: string;
  }) => {
    const toast = await toastController.create({
      color: data.type,
      duration: data.duration,
      position: data.position,
      message: data.message,
    });
    await toast.present();
  };

  return {
    logOut,
    formatFn,
    showNotify,
    isAdminOrModerator,
    isUser,
  };
};

export { useUserCompositions };
