'use server';

/**
 * @fileOverview Provides AI-powered product recommendations based on the current product.
 *
 * - getProductRecommendations - A function that retrieves product recommendations.
 * - ProductRecommendationsInput - The input type for the getProductRecommendations function.
 * - ProductRecommendationsOutput - The return type for the getProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationsInputSchema = z.object({
  currentProductId: z.string().describe('The ID of the product currently being viewed.'),
  userPurchaseHistory: z.array(z.string()).optional().describe('List of product IDs representing the user purchase history.'),
  userBrowsingHistory: z.array(z.string()).optional().describe('List of product IDs representing the user browsing history.'),
});

export type ProductRecommendationsInput = z.infer<typeof ProductRecommendationsInputSchema>;

const ProductRecommendationsOutputSchema = z.object({
  recommendedProductIds: z.array(z.string()).describe('An array of product IDs recommended to the user.'),
});

export type ProductRecommendationsOutput = z.infer<typeof ProductRecommendationsOutputSchema>;

export async function getProductRecommendations(input: ProductRecommendationsInput): Promise<ProductRecommendationsOutput> {
  return productRecommendationsFlow(input);
}

const productRecommendationsPrompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: {schema: ProductRecommendationsInputSchema},
  output: {schema: ProductRecommendationsOutputSchema},
  prompt: `You are an e-commerce product recommendation expert.
  Based on the current product the user is viewing (currentProductId), their purchase history (userPurchaseHistory), and their browsing history (userBrowsingHistory), recommend a list of product IDs that the user might be interested in.

Current Product ID: {{{currentProductId}}}
User Purchase History: {{#if userPurchaseHistory}}{{{userPurchaseHistory}}}{{else}}No purchase history{{/if}}
User Browsing History: {{#if userBrowsingHistory}}{{{userBrowsingHistory}}}{{else}}No browsing history{{/if}}

  Return only a list of product IDs in the recommendedProductIds field.`,
});

const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationsInputSchema,
    outputSchema: ProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await productRecommendationsPrompt(input);
    return output!;
  }
);
