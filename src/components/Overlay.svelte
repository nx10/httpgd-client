<script lang="ts">
</script>

<div id="overlay">
    <div id="overlay-text" />
</div>


<style lang="scss">
	@import '../style_vars';

	#overlay {
		position: fixed;
		display: none;
		width: 100%;
		height: 100%;
		background-color: rgba(92, 92, 92, 0.685);
		z-index: 2;
	}

	#overlay-text {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		font-size: 40px;
		font-family: $font-family;
		color: rgb(255, 255, 255);
		text-shadow: 2px 2px 8px rgb(46, 46, 46);
	}
</style>
