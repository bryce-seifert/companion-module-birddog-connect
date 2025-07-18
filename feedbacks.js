import { combineRgb } from '@companion-module/base'

export function getFeedbacks() {
	const feedbacks = {}

	const ColorGray = combineRgb(110, 110, 110)
	const ColorRed = combineRgb(200, 0, 0)
	const ColorGreen = combineRgb(0, 200, 0)
	const ColorOrange = combineRgb(255, 102, 0)

	let connectionColors = {
		CONNECTED: ColorGreen,
		CONNECTING: ColorOrange,
		FAILED: ColorRed,
		STOPPED: ColorGray,
	}

	let presenterLayoutOptions = [
		{ id: 'setFullscreenMain', label: 'Main Source Fullscreen' },
		{ id: 'setFullscreenVideo', label: 'Video Source Fullscreen' },
		{ id: 'setMixed', label: 'Mix Sources' },
	]

	let presenterSourceOptions = [
		{ id: 'setFullscreenVideo', label: 'Video Source' },
		{ id: 'setMixed', label: 'Mix Source' },
	]

	feedbacks['connectionConnected'] = {
		type: 'boolean',
		name: 'Connection Connected',
		description: 'Change style if a connection is connected',
		defaultStyle: {
			bgcolor: ColorGreen,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Connections',
				id: 'connection',
				choices: this.choices.connections,
				default: this.choices.connections?.[0]?.id,
			},
		],
		callback: (feedback) => {
			let connection = this.states.connections?.find(({ id }) => id === feedback.options.connection)
			if (connection) {
				return connection.state === 'CONNECTED' ? true : false
			} else {
				return false
			}
		},
	}

	feedbacks['connectionStatus'] = {
		type: 'advanced',
		name: 'Connection Status',
		description: 'Change background color based on connection status',
		options: [
			{
				type: 'dropdown',
				label: 'Connections',
				id: 'connection',
				choices: this.choices.connections,
				default: this.choices.connections?.[0]?.id,
			},
		],
		callback: (feedback) => {
			let connection = this.states.connections?.find(({ id }) => id === feedback.options.connection)
			if (connection) {
				return { bgcolor: connectionColors[`${connection.state}`] }
			} else {
				return { bgcolor: connectionColors[`FAILED`] }
			}
		},
	}

	feedbacks['endpointOnline'] = {
		type: 'boolean',
		name: 'Endpoint Online',
		description: 'Change style if an endpoint is online',
		defaultStyle: {
			bgcolor: ColorGreen,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Endpoints',
				id: 'endpoint',
				choices: this.choices.endpoints,
				default: this.choices.endpoints?.[0]?.id,
			},
		],
		callback: (feedback) => {
			let endpoint = this.states.endpoints?.find(({ id }) => id === feedback.options.endpoint)
			if (endpoint) {
				return endpoint.online
			} else {
				return false
			}
		},
	}

	feedbacks['presenterLayout'] = {
		type: 'boolean',
		name: 'Presenter Layout',
		description: 'Change style if a Presenter is set to the selected layout',
		defaultStyle: {
			bgcolor: ColorGreen,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Presenter Connection',
				id: 'connection',
				choices: this.choices.presenters,
				default: this.choices.presenters?.[0]?.id,
			},
			{
				type: 'dropdown',
				label: 'Layout',
				id: 'layout',
				choices: presenterLayoutOptions,
				default: 'setFullscreenMain',
			},
		],
		callback: (feedback) => {
			return this.states.presenters[feedback.options.connection]?.layout === feedback.options.layout
		},
	}

	feedbacks['presenterSource'] = {
		type: 'boolean',
		name: 'Presenter Source',
		description: 'Change style if a Presenter is set to the selected source',
		defaultStyle: {
			bgcolor: ColorGreen,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Presenter Connection',
				id: 'connection',
				choices: this.choices.presenters,
				default: this.choices.presenters?.[0]?.id,
			},
			{
				type: 'dropdown',
				label: 'Layout',
				id: 'layout',
				choices: presenterSourceOptions,
				default: 'setFullscreenVideo',
			},
			{
				type: 'dropdown',
				label: 'Custom Source',
				id: 'source',
				choices: this.choices.presentersSources,
				default: this.choices.presentersSources?.[0]?.id,
			},
		],
		callback: (feedback) => {
			if (
				feedback.options.layout === 'setFullscreenVideo' &&
				this.states.presenters[feedback.options.connection]?.layout === 'setFullscreenVideo'
			) {
				return this.states.presenters[feedback.options.connection]?.fullscreenSource === feedback.options.source
			} else if (
				feedback.options.layout === 'setMixed' &&
				this.states.presenters[feedback.options.connection]?.layout === 'setMixed'
			) {
				return this.states.presenters[feedback.options.connection]?.mixedSource === feedback.options.source
			} else {
				return false
			}
		},
	}

	feedbacks['presenterAudioDevice'] = {
		type: 'boolean',
		name: 'Presenter Audio Device',
		description: 'Change style if a Presenter is set to the selected audio device',
		defaultStyle: {
			bgcolor: ColorGreen,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Presenter Connection',
				id: 'connection',
				choices: this.choices.presenters,
				default: this.choices.presenters?.[0]?.id,
			},
			{
				type: 'dropdown',
				label: 'Audio Device',
				id: 'audio',
				choices: this.choices.audioDevices,
				default: this.choices.audioDevices?.[0]?.id,
			},
		],
		callback: (feedback) => {
			return this.states.presenters[feedback.options.connection]?.audioDevice === feedback.options.audio
		},
	}

	feedbacks['presenterOverlayActive'] = {
		type: 'boolean',
		name: 'Presenter Overlay Active',
		description: 'Change style if a Presenter overlay is active',
		defaultStyle: {
			bgcolor: ColorGreen,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Presenter Connection',
				id: 'connection',
				choices: this.choices.presenters,
				default: this.choices.presenters?.[0]?.id,
			},
		],
		callback: (feedback) => {
			return this.states.presenters[feedback.options.connection]?.overlay === 'fadeIn'
		},
	}

	feedbacks['presenterPTZDevice'] = {
		type: 'boolean',
		name: 'Presenter PTZ Device',
		description: 'Change style if a Presenter is set to the selected PTZ device in Companion',
		defaultStyle: {
			bgcolor: ColorGreen,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Presenter Connection',
				id: 'connection',
				choices: this.choices.presenters,
				default: this.choices.presenters?.[0]?.id,
			},
			{
				type: 'dropdown',
				label: 'Device',
				id: 'device',
				choices: this.choices.ndiSources,
				default: this.choices.ndiSources?.[0]?.id,
			},
		],
		callback: (feedback) => {
			return (
				this.states.ptzDevice.connectionId === feedback.options.connection &&
				this.states.ptzDevice.sourceName === feedback.options.device
			)
		},
	}

	feedbacks['recordingActive'] = {
		type: 'boolean',
		name: 'Recording Active',
		description: 'Change style if a recording is active',
		defaultStyle: {
			bgcolor: ColorRed,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Presenter Connection',
				id: 'recording',
				choices: this.choices.recordings,
				default: this.choices.recordings?.[0]?.id,
			},
		],
		callback: (feedback) => {
			let recording = this.states.recordings?.find(({ id }) => id === feedback.options.recording)
			if (recording) {
				return recording.isStarted
			} else {
				return false
			}
		},
	}

	feedbacks['encoderSessionActive'] = {
		type: 'boolean',
		name: 'Encode/Decode Active',
		description: 'Change style if an encode/decode is active',
		defaultStyle: {
			bgcolor: ColorRed,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Encode/Decode',
				id: 'encoderSession',
				choices: this.choices.encoderSessions,
				default: this.choices.encoderSessions?.[0]?.id,
			},
		],
		callback: (feedback) => {
			let encoderSession = this.states['encoder-sessions']?.find(({ id }) => id === feedback.options.encoderSession)

			if (encoderSession) {
				return encoderSession.isStarted
			} else {
				return false
			}
		},
	}

	feedbacks['presetActive'] = {
		type: 'boolean',
		name: 'PTZ Preset Active',
		description: 'Change style if a PTZ preset is active',
		defaultStyle: {
			bgcolor: ColorGreen,
		},
		options: [
			{
				type: 'checkbox',
				label: 'Use Device Selected via Companion',
				id: 'local',
				default: true,
				tooltip: 'Select the device using the "Presenter - Select PTZ Device" action',
			},
			{
				type: 'dropdown',
				label: 'Device',
				id: 'device',
				choices: this.choices.ndiSources,
				default: this.choices.ndiSources?.[0]?.id,
				isVisibleExpression: '!$(options:local)',
			},
			{
				type: 'number',
				label: 'Preset Number',
				id: 'preset',
				default: 1,
				min: 1,
				max: 9,
				step: 1,
			},
		],
		callback: (feedback) => {
			let source = feedback.options.local ? this.states.ptzDevice.sourceName : feedback.options.device
			return this.states.presets[`${source}`] === feedback.options.preset - 1
		},
	}

	return feedbacks
}
