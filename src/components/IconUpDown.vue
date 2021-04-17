<template>
    <div>
        <span :class="redOrGreen"> {{ percent.toFixed(2) }}% </span>
        <svg
            v-if="isPositive"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="green"
        >
            <path
                d="M5 20v2h-2v-2h2zm2-2h-6v6h6v-6zm6-1v5h-2v-5h2zm2-2h-6v9h6v-9zm6-2v9h-2v-9h2zm2-2h-6v13h6v-13zm0-11l-6 1.221 1.716 1.708-6.85 6.733-3.001-3.002-7.841 7.797 1.41 1.418 6.427-6.39 2.991 2.993 8.28-8.137 1.667 1.66 1.201-6.001z"
            />
        </svg>

        <svg
            v-if="!isPositive"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="red"
        >
            <path
                d="M5 20v2h-2v-2h2zm2-2h-6v6h6v-6zm6-1v5h-2v-5h2zm2-2h-6v9h6v-9zm6-2v9h-2v-9h2zm2-2h-6v13h6v-13zm-21.976 4.875l6-1.221-1.716-1.708 4.183-4.108 3.001 3.002 10.508-10.422-1.41-1.418-9.094 9.015-2.991-2.993-5.613 5.512-1.667-1.66-1.201 6.001z"
            />
        </svg>
    </div>
</template>

<script>
export default {
    name: 'IconUpDown',
    props: {
        percent: Number,
    },
    computed: {
        isPositive: function() {
            return this.percent >= 0;
        },
        redOrGreen: function() {
            return this.isPositive ? 'green' : 'red';
        },
    },
};
</script>

<style scoped>
.red {
    color: red;
}

.green {
    color: green;
}

div {
    font-size: 1.3rem;
    display: flex;
    align-items: center;
}

svg {
    padding-left: 10px;
    padding-bottom: 10px;
}
</style>
