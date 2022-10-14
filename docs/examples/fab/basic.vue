<template>
  <div :style="{ position: 'relative' }">
    Check the floating boxes

    <s-fab :style="{ border: '1px solid green', zIndex: 999 }">
      <div :style="{ padding: '4px 8px' , width: '150px', textAlign: 'center', backgroundColor: '#eee' }">
        Float Active Box!
      </div>
    </s-fab>
  </div>
</template>
