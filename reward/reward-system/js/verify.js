document.addEventListener('DOMContentLoaded', () => {
    const getCodeBtn = document.getElementById('get-code-btn');
    const continueBtn = document.getElementById('continue-btn');
    const codeSection = document.getElementById('code-section');
    const generatedIdDisplay = document.getElementById('generated-id-display');
    const rewardIdInput = document.getElementById('reward-id-input');
    const errorMsg = document.getElementById('error-msg');
    
    const countryInput = document.getElementById('country');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    let isSubmitting = false;

    // Generate random Reward ID
    const generateRewardId = () => {
        const randomNum = Math.floor(100000 + Math.random() * 900000); // 6 digit number
        return `RW-${randomNum}`;
    };

    // Handle "Get Reward ID" click
    getCodeBtn.addEventListener('click', async () => {
        // Basic validation
        if (!countryInput.value || !phoneInput.value || !emailInput.value) {
            alert('Please fill in all fields first.');
            return;
        }

        // Disable button to prevent double clicks
        getCodeBtn.disabled = true;
        getCodeBtn.textContent = 'Processing...';

        const rewardId = generateRewardId();
        
        // Save to LocalStorage
        localStorage.setItem('verification_reward_id', rewardId);

        // Simulate network delay for better UX
        setTimeout(() => {
            // Show the ID to the user
            generatedIdDisplay.textContent = `Your Code: ${rewardId}`;
            generatedIdDisplay.classList.remove('hidden');
            
            // Enable next section
            codeSection.style.opacity = '1';
            codeSection.style.pointerEvents = 'auto';
            continueBtn.style.opacity = '1';
            continueBtn.style.pointerEvents = 'auto';
            
            getCodeBtn.textContent = 'Code Sent!';
            
            // Focus on input
            rewardIdInput.focus();
            
            alert(`Your Reward ID is: ${rewardId}\n(In a real app, this would be sent via SMS)`);
        }, 1500);
    });

    document.getElementById('verification-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        if (isSubmitting) {
            return;
        }
        isSubmitting = true;
        continueBtn.disabled = true;
        continueBtn.textContent = 'Submitting...';
        
        const enteredId = rewardIdInput.value.trim();
        const storedId = localStorage.getItem('verification_reward_id');

        if (enteredId === storedId) {
            const userData = {
                country: countryInput.value,
                phone: phoneInput.value,
                email: emailInput.value,
                reward_code: storedId
            };
            try {
                if (window.supabaseClient) {
                    const { error } = await window.supabaseClient
                        .from('users')
                        .insert([userData]);
                    if (error) {
                        console.error('Supabase Insert Error:', error.message, error.details);
                        alert('Error saving data. Please try again.');
                        isSubmitting = false;
                        continueBtn.disabled = false;
                        continueBtn.textContent = 'Continue Verification →';
                        return;
                    }
                }
            } catch (err) {
                console.error('Unexpected error submitting data:', err);
                alert('Unexpected error. Please try again.');
                isSubmitting = false;
                continueBtn.disabled = false;
                continueBtn.textContent = 'Continue Verification →';
                return;
            }
            window.location.href = 'success.html';
        } else {
            errorMsg.classList.add('visible');
            rewardIdInput.style.borderColor = 'var(--error-color)';
            isSubmitting = false;
            continueBtn.disabled = false;
            continueBtn.textContent = 'Continue Verification →';
        }
    });

    // Clear error on input
    rewardIdInput.addEventListener('input', () => {
        errorMsg.classList.remove('visible');
        rewardIdInput.style.borderColor = 'var(--border-color)';
    });
});
