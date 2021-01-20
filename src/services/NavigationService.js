const NavigationService = () => {
	const navigate = (props, route, params) => {
		if (props && props.replace) {
			props.replace({
				pathname: route,
				state: params,
			});
		}
	};

	const navigateToUrl = (url) => {
		let w = document.body.clientWidth - 30,
			h = document.body.clientHeight - 30;
		let win = window.open(
			url,
			'contentwin',
			'width=' + w + ',height=' + h + ',menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes'
		);
		win.focus();
		return false;
	};

	return {
		navigate,
		navigateToUrl,
	};
};

export default NavigationService;
