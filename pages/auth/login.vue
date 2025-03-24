<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <!-- Database Status -->
      <div v-if="dbStatus" class="rounded-md p-4" :class="dbStatus.status === 'success' ? 'bg-green-50' : 'bg-red-50'">
        <div class="flex">
          <div class="flex-shrink-0">
            <CheckCircleIcon v-if="dbStatus.status === 'success'" class="h-5 w-5 text-green-400" />
            <XCircleIcon v-else class="h-5 w-5 text-red-400" />
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium" :class="dbStatus.status === 'success' ? 'text-green-800' : 'text-red-800'">
              {{ dbStatus.message }}
            </h3>
            <div v-if="dbStatus.details" class="mt-2 text-sm" :class="dbStatus.status === 'success' ? 'text-green-700' : 'text-red-700'">
              <p>Users in database: {{ dbStatus.details.userCount }}</p>
              <p>Environment: {{ dbStatus.details.env.nodeEnv }}</p>
            </div>
          </div>
        </div>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="login">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <UInput
              v-model="email"
              type="email"
              placeholder="Email address"
              required
              :error="error"
            />
          </div>
          <div class="mt-4">
            <UInput
              v-model="password"
              type="password"
              placeholder="Password"
              required
              :error="error"
            />
          </div>
        </div>

        <div v-if="error" class="text-red-500 text-sm text-center">
          {{ error }}
        </div>

        <div>
          <BaseButton
            type="submit"
            class="w-full"
            :disabled="loading"
          >
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/solid'

const router = useRouter()
const email = ref("")
const password = ref("")
const loading = ref(false)
const error = ref("")
const dbStatus = ref(null)

// Проверка подключения к базе данных
const checkDatabaseConnection = async () => {
  try {
    const { data } = await useFetch('/api/test-db-detailed')
    dbStatus.value = {
      status: 'success',
      message: 'Database connection successful',
      details: data.value.details
    }
  } catch (e) {
    dbStatus.value = {
      status: 'error',
      message: 'Database connection failed',
      error: e.message
    }
  }
}

onMounted(() => {
  checkDatabaseConnection()
})

const login = async () => {
  try {
    error.value = "";
    loading.value = true;
    
    const { data } = await useFetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    });

    if (data.value) {
      router.push('/');
    }
  } catch (e) {
    error.value = e.message || 'Invalid credentials';
  } finally {
    loading.value = false;
  }
};

definePageMeta({
  middleware: ["guest"],
});
</script>

<style scoped lang="scss">
.auth-login {
  display: flex;
  gap: 24px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 100%;

  .btns {
    display: flex;
    gap: 12px;
  }
}
</style>
