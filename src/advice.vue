<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const data = ref();
const isLoading = ref(true);
const error = ref(null);

init(route.query.number)

async function init (number) {
    isLoading.value = true
    error.value = null

    try {
        var url = 'https://api.adviceslip.com/advice'

        if (Number(number)) url += '/' + number

        const response = await fetch(url)
        const d = await response.json()

        if (!response.ok) throw d

        data.value = d.slip

        if (!d.slip) throw "Not Found!"

        router.push({ query: { number: data.value.id } })
    } catch (e) {
        console.log(e)
        error.value = e
    }

    isLoading.value = false
}

</script>


<template>
    <section class="max-w-[600px] w-full mx-auto mt-5 mb-10">
        <div
            class="flex justify-center items-center bg-dark-grayish-blue mx-5 px-8 py-5 rounded-xl text-center min-h-[9rem]">
            <div v-if="isLoading">
                <img class="animate-spin" src="./assets/icon-load.svg" />
            </div>

            <div v-else class="w-full">
                <div v-if="error" class="text-red-500 my-5">
                    {{ error }}
                </div>

                <div v-else>
                    <div class="py-6 text-xs neon-green uppercase tracking-[0.25rem]">Advice #{{ data.id }}</div>
                    <div class="light-cyan text-[28px]">“{{ data.advice }}”</div>
                </div>

                <div class="relative mt-10 mb-12 border-t border-grayish-blue">
                    <div class="w-full justify-center flex absolute -top-2">
                        <div class="flex gap-2 bg-dark-grayish-blue px-2">
                            <div v-for="_ in 2" class="w-1.5 h-4 rounded-full bg-light-cyan"></div>
                        </div>
                    </div>

                    <div class="absolute w-full flex justify-center top-10">
                        <button @click="init"
                            class="bg-neon-green p-4 rounded-full hover:shadow-[0_0_2px_#52ffa880,inset_0_0_2px_#52ffa880,0_0_5px_#52ffa880,0_0_15px_#52ffa880,0_0_30px_#52ffa880]">
                            <img src="./assets/icon-dice.svg" />
                        </button>
                    </div>
                </div>
            </div>


        </div>
    </section>
</template>