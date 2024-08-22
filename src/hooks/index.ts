export const usePersistirToken = () => {
    return (token: string) => {
        sessionStorage.setItem('token', token);
    };
};

export const useObterToken = () => {
    return sessionStorage.getItem('token');
};
