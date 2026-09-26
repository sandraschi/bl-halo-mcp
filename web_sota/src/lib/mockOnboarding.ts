export const MOCK_ACTORS = ["Joe Mocky", "Sandra Mockinger"];
export const isMock = (h: any) =>
	!h || h.mock === true || h.instance_configured === false;
