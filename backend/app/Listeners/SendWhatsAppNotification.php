<?php
namespace App\Listeners;

use App\Events\DevisCreated;
use App\Services\WhatsAppService;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendWhatsAppNotification implements ShouldQueue
{
    public function __construct(
        private WhatsAppService $whatsAppService
    ) {}

    public function handle(DevisCreated $event): void
    {
        $devis = $event->devis;

        $message = "
🚨 Nouveau devis reçu

👤 Client: {$devis->prenom} {$devis->nom}
📞 Téléphone: {$devis->tel}
📧 Email: {$devis->email}
🛠 Service: {$devis->service}
📍 Département: {$devis->departement}
⚡ Urgent: " . ($devis->urgent ? 'Oui' : 'Non') . "

📝 Message:
{$devis->message}
        ";

        $this->whatsAppService->send($message);
    }
}
