<?php

namespace Database\Seeders;

use App\Models\ChatbotConfig;
use Illuminate\Database\Seeder;

class ChatbotConfigSeeder extends Seeder
{
    public function run(): void
    {
        // Évite les doublons si le seeder est lancé plusieurs fois
        if (ChatbotConfig::count() > 0) {
            $this->command->info('ChatbotConfig : configuration déjà existante, seeder ignoré.');
            return;
        }

        ChatbotConfig::create([
            'welcome_message' => "Bonjour ! 👋 Je suis l'assistant de 3D Services. Je peux vous aider pour :\n• Obtenir un devis de débarras\n• Connaître nos tarifs\n• Prendre rendez-vous\nComment puis-je vous aider ?",
            'system_prompt'   => "Tu es l'assistant virtuel de 3D Services, une entreprise de débarras en Île-de-France. Tu es professionnel, chaleureux et efficace. Tu connais les services : débarras maison/appartement, cave, garage, succession, nettoyage Diogène, dératisation. Zone : Paris et Île-de-France. Téléphone : 06 09 99 17 36.",
            'proactive_delay'  => 30,
            'proactive_message'=> 'Besoin d\'un devis gratuit ? Je peux vous aider ! 😊',
            'suggestions'      => [
                [
                    'text'     => 'Obtenir un devis',
                    'response' => 'Pour obtenir un devis gratuit, il me faut quelques informations : votre adresse, le type de prestation souhaitée et le volume approximatif. Vous pouvez aussi appeler le 06 09 99 17 36.',
                ],
                [
                    'text'     => 'Quels sont vos tarifs ?',
                    'response' => 'Nos tarifs démarrent à partir de 80€ pour un petit débarras. Le prix dépend du volume, de l\'accessibilité et du type d\'objets. Consultez notre page tarifs pour plus de détails.',
                ],
                [
                    'text'     => 'Zones d\'intervention',
                    'response' => 'Nous intervenons sur Paris et toute l\'Île-de-France : 75, 77, 78, 91, 92, 93, 94, 95. Intervention possible sous 24-48h.',
                ],
                [
                    'text'     => 'Prendre rendez-vous',
                    'response' => 'Pour prendre rendez-vous, appelez-nous au 06 09 99 17 36 ou remplissez le formulaire de devis en ligne. Nous vous recontactons sous 2h.',
                ],
            ],
            'max_messages' => 50,
            'enabled'      => true,
        ]);

        $this->command->info('ChatbotConfig : configuration par défaut créée avec succès.');
    }
}
