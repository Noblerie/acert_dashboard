import { ref } from 'vue';

export interface Product {
  firstName: string;

}

export const useCart = () => {
  const firstName = ref('Product');

  return { firstName };
};
